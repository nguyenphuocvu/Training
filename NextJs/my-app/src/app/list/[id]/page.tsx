'use client'

import { useParams } from 'next/navigation';
import CitySection from '@/app/components/City/CitySection';
import { Layout , Button } from 'antd';
import { useRouter } from 'next/navigation';
const ListDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter()
  const handleBackHome = () => {
    router.push("/home")
  }
  return (
    <Layout className="p-5 bg-gray-100 min-h-screen">
        <Button 
           onClick={() => handleBackHome()}
           className='w-[60px]'
        >
            Back
        </Button>
      <h1 className="text-2xl font-bold mb-4"> {id}</h1>
      <CitySection group={id} />
    </Layout>
  );
};

export default ListDetailPage;
