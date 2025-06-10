'use client'

import { useParams } from 'next/navigation';
import CitySection from '@/app/components/City/CitySection';
import { Layout } from 'antd';
import Link from 'next/link';
const ListDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Layout className="p-5 bg-gray-100 min-h-screen">
        <Link href="/home"> Quay lai </Link>
      <h1 className="text-2xl font-bold mb-4"> {id}</h1>
      <CitySection group={id} />
    </Layout>
  );
};

export default ListDetailPage;
