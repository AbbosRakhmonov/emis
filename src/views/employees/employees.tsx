'use client';
import { useGetUsersQuery } from '@/src/redux/services/employees';
import { useTable } from '@/src/shared/hooks';
import { useModal } from '@/src/shared/hooks/useModal';
import EmployeeInfo from '@/src/shared/ui/employee-info';
import { _COLUMNS } from '@/src/views/employees/models/columns';
import { useCallback, useState } from 'react';

export const Employees = () => {
  const [selectedItem, setSelectedItem] = useState<IUser | null>(null);

  const { openModal, ModalContent } = useModal({
    setSelectedItem,
  });

  const selectItemHandler = useCallback(
    (record: IUser) => {
      setSelectedItem(record);
      openModal();
    },
    [openModal]
  );
  const editItemHandler = useCallback((record: IUser) => {}, []);
  const deleteItemHandler = useCallback((record: IUser) => {}, []);

  const { page, size, TableComponent } = useTable({
    fetcher: useGetUsersQuery,
    fetcherParams: {
      'Accept-Language': 'ru',
    },
    columns: _COLUMNS,
    selectItemHandler,
    editItemHandler,
    deleteItemHandler,
  });

  return (
    <div>
      <TableComponent />
      <ModalContent>
        {selectedItem && <EmployeeInfo user={selectedItem} />}
      </ModalContent>
    </div>
  );
};
