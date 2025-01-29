'use client';
import { setDepartment, setOrganization, setUser } from '@/src/redux/reducers';
import MainLayout from '@/src/shared/layouts/main';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    const organization = localStorage.getItem('organization');
    const department = localStorage.getItem('department');
    if (user) dispatch(setUser(JSON.parse(user)));
    if (organization) dispatch(setOrganization(JSON.parse(organization)));
    if (department) dispatch(setDepartment(JSON.parse(department)));
  }, []);
  return <MainLayout>{props.children}</MainLayout>;
};

export default Layout;
