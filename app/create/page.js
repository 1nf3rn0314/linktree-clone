import { Suspense } from 'react';
import GenerateForm from './GenerateForm';

const GeneratePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateForm />
    </Suspense>
  )
}

export default GeneratePage;
