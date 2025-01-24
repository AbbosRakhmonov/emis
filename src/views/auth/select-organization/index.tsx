'use client';

import {
  useAuthPayloadQuery,
  useLazyGetOrganizationDepartmentsQuery,
} from '@/src/redux/services';
import { mapToOptions } from '@/src/shared/helpers';
import { notification } from '@/src/utils/snackbarUtils';
import {
  localStorageRemoveItem,
  localStorageSetItem,
} from '@/src/utils/storage-available';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface FormData {
  organization_uuid: string;
  child_id: string | null;
}

const validationSchema = Yup.object()
  .shape({
    child_id: Yup.string().required('Выберите отдел').nullable(),
    organization_uuid: Yup.string().required('Выберите организацию'),
  })
  .required();

const defaultValues: FormData = {
  child_id: '',
  organization_uuid: '',
};

export function SelectOrganization() {
  const router = useRouter();
  const authProps = useAuthPayloadQuery();
  const [getDepartments, departmentsProps] =
    useLazyGetOrganizationDepartmentsQuery();

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  });

  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  console.log(errors);

  // Список доступных организаций
  const organizationsOptions = useMemo(
    () =>
      mapToOptions({
        valueKey: 'uuid',
        labelKey: 'name',
        data: authProps?.data?.data?.organizations,
      }),
    [authProps.data]
  );

  // Список дочерних организаций
  const childOptions = useMemo(
    () =>
      mapToOptions({
        valueKey: 'id',
        labelKey: 'name',
        data: departmentsProps.data,
      }),
    [departmentsProps.data]
  );

  const handleOrganizationChange = useCallback(
    async (selectedValue: string) => {
      if (!selectedValue) return;

      try {
        // Очищаем данные о дочерней организации
        localStorageRemoveItem('department');

        // Получаем список дочерних организаций
        const departments = await getDepartments({
          uuid: selectedValue,
        }).unwrap();

        if (departments.length === 1) {
          localStorageSetItem('department', JSON.stringify(departments[0]));
          setValue('child_id', String(departments[0].id));
        } else {
          setValue('child_id', null);
        }
      } catch (error) {
        notification.show({
          severity: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить дочерние организации',
        });
        console.log(error);
      }
    },
    [
      getDepartments,
      setValue,
      localStorageRemoveItem,
      localStorageSetItem,
      notification.show,
    ]
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Сохраняем выбранную организацию
      localStorageSetItem('organization_uuid', data.organization_uuid);

      const organization = authProps.data?.data?.organizations.find(
        (org: any) => org.uuid === data.organization_uuid
      );
      localStorageSetItem('organization', JSON.stringify(organization));

      if (departmentsProps.data?.length === 0) {
        router.push('/');
      } else if (departmentsProps.data?.length === 1) {
        localStorageSetItem(
          'department',
          JSON.stringify(departmentsProps.data[0])
        );
      } else if (data.child_id) {
        const selectedChild = departmentsProps.data.find(
          (dep: any) => dep.id === Number(data.child_id)
        );
        if (selectedChild) {
          localStorageSetItem('department', JSON.stringify(selectedChild));
        }
      }

      router.push('/');
    } catch (error) {
      notification.show({
        severity: 'error',
        title: 'Ошибка',
        message: 'Не удалось выполнить операцию',
      });
      console.log(error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 400,
        height: 'auto',
        maxHeight: 400,
        maxWidth: '90%',
        margin: '0 auto',
        borderRadius: 2,
        padding: 2,
      }}
    >
      {departmentsProps.isLoading ? (
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ mt: 2, borderRadius: 1 }}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography component="h2" align="center" mb={3}>
            Выберите организацию
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="organization_uuid"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="organization-select-label">
                        Организация
                      </InputLabel>
                      <Select
                        labelId="organization-select-label"
                        value={value || ''}
                        label="Организация"
                        onChange={async (event) => {
                          const selectedValue = event.target.value;
                          onChange(selectedValue);
                          if (selectedValue) {
                            await handleOrganizationChange(selectedValue);
                          }
                        }}
                        error={!!errors.organization_uuid?.message}
                      >
                        {organizationsOptions?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {!!errors.organization_uuid?.message && (
                        <FormHelperText error>
                          {errors.organization_uuid.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                {childOptions.length > 0 && (
                  <Controller
                    name="child_id"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormControl fullWidth>
                        <InputLabel id="child-select-label">
                          Дочерняя организация
                        </InputLabel>
                        <Select
                          labelId="child-select-label"
                          value={value || ''}
                          label="Дочерняя организация"
                          onChange={(event) => onChange(event.target.value)}
                          error={!!errors.child_id?.message}
                        >
                          {childOptions.map((option) => (
                            <MenuItem
                              key={option.value || ''}
                              value={option.value || ''}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Подтвердить
                </Button>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      )}
    </Paper>
  );
}
