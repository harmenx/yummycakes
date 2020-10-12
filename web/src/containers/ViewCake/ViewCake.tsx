import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { AxiosResponse } from 'axios';
import { getCake } from '../../api';
import { Cake } from '../../types/models';
import './ViewCake.css';

export const ViewCake: React.FunctionComponent = () => {
  const [cake, setCake] = useState<Cake>({
    _id: '', name: '', comment: '', imageUrl: '', yumFactor: 0,
  });
  const { id } = useParams();

  const getACake = async () => {
    const data = await getCake(id);
    if ((data as AxiosResponse<Cake>).data._id) {
      setCake((data as AxiosResponse<Cake>).data);
    }
  };

  useEffect(() => {
    getACake();
  });

  return (
    <div className="cakeDisplay">
      <div>
        <h2>{cake && cake.name}</h2>
        <p>
          Comment -
          {cake && cake.comment}
        </p>
        <p>
          Yum Factor -
          {cake && cake.yumFactor}
        </p>
        <img className="cake-img" src={cake && (cake.imageUrl || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg')} alt="" width="200" height="200" />
      </div>
      <a href="/">Back</a>
    </div>
  );
};
