import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getCakes } from '../../api';
import { Cake } from '../../types/models';
import './ViewCakes.css';

export const ViewCakes: React.FunctionComponent = () => {
  const [cakes, setCakes] = useState<Cake[]>();

  const getAllCakes = async () => {
    const data = await getCakes();
    setCakes(data);
  };

  useEffect(() => {
    getAllCakes();
  }, []);

  return (
    <div className="cakesForm">
      <h2 className="cakeHeader">View the yummy cakes</h2>
      <Container>
        {cakes ? cakes.map((cake: Cake, cakeId: number) => (
          <Row key={cakeId} className="cakeRow">
            <Col>
              <img className="cake-img" src={cake && (cake.imageUrl || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg')} alt="" width="200" height="200" />
            </Col>
            <Col>
              <a href={`./cake/${cake._id}`}>{cake && cake.name}</a>
            </Col>
          </Row>
        )) : <p className="warning">There was an error retreiving cakes! Please try again.</p>}
      </Container>
      <a className="cakeHeader" href="cakes/add"><h2>Add a cake!</h2></a>

    </div>
  );
};
