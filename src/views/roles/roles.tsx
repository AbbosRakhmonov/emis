'use client';
import { useGetRolesQuery } from '@/src/redux/services/roles';
import { useTable } from '@/src/shared/hooks';
// import { useModal } from '@/src/shared/hooks/useModal';
import { IRole } from '@/src/types/roles';
import { _COLUMNS } from '@/src/views/roles/models/columns';
import { useState } from 'react';

export const Roles = () => {
  const [selectedItem, setSelectedItem] = useState<IRole | null>(null);

  //   const { openModal, ModalContent } = useModal({
  //     setSelectedItem,
  //   });

  const { page, size, TableComponent } = useTable({
    fetcher: useGetRolesQuery,
    columns: _COLUMNS,
  });

  return (
    <div>
      <TableComponent />
      {/* <ModalContent></ModalContent> */}
    </div>
  );
};
