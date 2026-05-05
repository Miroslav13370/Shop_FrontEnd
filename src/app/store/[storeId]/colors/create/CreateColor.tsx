'use client';

import useGetColor from '@/src/hooks/queries/colors/useGetColor';

import { ColorForm } from '../ColorForm';

const CreateColor = () => {
  const { colorData } = useGetColor();
  return (
    <div>
      <ColorForm color={colorData} />
    </div>
  );
};

export default CreateColor;
