import React, { useState } from 'react';
import { FormText, Input, Label } from 'reactstrap';
import { AvForm, AvGroup } from 'availity-reactstrap-validation';
import { Cake } from '../../types/models';
import { createCake } from '../../api';
import "./CreateCake.css";

export const CreateCake: React.FunctionComponent = () => {
  const [cake, setCake] = useState<Cake>({ _id: "", name: "", comment: "", imageUrl: "", yumFactor: 3 });
  const [nameError, setNameError] = useState<String>("");
  const [commentError, setCommentError] = useState<String>("");
  const [imageUrlError, setImageUrlError] = useState<String>("");
  const [cakeError, setCakeError] = useState<String>();
  const submitFormAdd = (e: React.FormEvent) => {

    let hasError = false;
    if (!cake.name) {
      setNameError('A name is required');
      hasError = true;
    }
    if (!cake.comment) {
      setCommentError('A comment is required');
      hasError = true;
    } else {
      if (cake.comment.length < 5 || cake.comment.length > 200) {
        setCommentError('Comment must be between 5 and 200 characters');
        hasError = true;
      }
    }
    if (!cake.imageUrl) {
      setImageUrlError('An image url is required');
      hasError = true;
    }
    if (hasError) {
      return;
    }
    e.preventDefault()
    createCake(cake).then((result) => {
      if (result.data) {
        window.location.pathname = "/";
      } else if(result===400) {
        setCakeError("A cake with this name already exists! Try a different name");
      }else{
        setCakeError("There was error submitting your cake - please try again!");
      }
    }).catch((error)=>{
     
    });
  }

  const updateCake = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...cake, [e.target.name]: e.target.value } as Cake;
    if (e.target.name === "name") {
      setNameError("");
      setCakeError("");
    }
    if (e.target.name === "comment") {
      setCommentError("");
    }
    if (e.target.name === "imageUrl") {
      setImageUrlError("");
    }
    setCake(updatedData);
  }

  return (
    <div className='cakeForm'>
      <h2>Add your yummy cake!</h2>
      <AvForm onSubmit={submitFormAdd}>
        <AvGroup controlId="formBasic">
          <Label>Name</Label>
          <Input type="text" name="name" onChange={updateCake} value={cake.name} />
          {nameError && (<div>
            <FormText className="text-muted">
              {nameError}
            </FormText>
          </div>)}

          <Label>Comment</Label>
          <Input type="text" name="comment" onChange={updateCake} value={cake.comment} />
          {commentError && (<div>
            <FormText className="text-muted">
              {commentError}
            </FormText>
          </div>)}

          <Label>Image URL</Label>
          <Input type="text" name="imageUrl" onChange={updateCake} value={cake.imageUrl} />
          {imageUrlError && (<div>
            <FormText className="text-muted">
              {imageUrlError}
            </FormText>
          </div>)}

          <Label>Yum Factor</Label>
          <Input type="number" min={1} max={5} name="yumFactor" onChange={updateCake} value={cake.yumFactor} />

        </AvGroup>
       
        {cakeError !== "" && <p>{cakeError}</p>}
        <button className="submitButton" type="submit">Submit</button>
        <a href="/">Back</a>
      </AvForm>
    </div>
  );
}
