'use client';

import useGetColor from '@/src/hooks/queries/colors/useGetColor';

import { ColorForm } from '../ColorForm';

const EditColor = () => {
  const { colorData } = useGetColor();

  return (
    <div>
      <ColorForm color={colorData} />
    </div>
  );
};

export default EditColor;
