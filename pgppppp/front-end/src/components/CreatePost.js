import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import { Card } from "react-bootstrap";

function CreatePost({ activeItem, toggle, onSave }) {
  const [activeItem2, setActiveItem] = useState(activeItem);

  function handleChange(e) {
    let { name, value } = e.target;
    const activeItem = { ...activeItem2, [name]: value };

    setActiveItem(activeItem);
  }

  return (
    <div>
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Post </ModalHeader>
        <Card>
          <Card.Img variant="top" src={activeItem2.track_cover} style={{ width: "300px", margin: "auto", marginTop: "10px" }} />
          <Card.Body>
            <Card.Title>
              <h1>{activeItem2.track_artist}</h1>
            </Card.Title>
            <Card.Text>
              <h2>{activeItem2.track_title}</h2>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card></Card>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" value={activeItem2.postTitle} onChange={handleChange} placeholder="Enter Post Title" />
            </FormGroup>

            <FormGroup>
              <Label for="content">Description</Label>
              <Input type="textarea" name="content" value={activeItem2.postContent} onChange={handleChange} placeholder="Enter Post Content" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(activeItem2)}>
            저장
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreatePost;
