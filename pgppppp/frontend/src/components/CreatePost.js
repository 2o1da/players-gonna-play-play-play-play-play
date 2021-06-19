import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

function CreatePost({ activeItem, toggle, onSave }) {
  const [activeItem2, setActiveItem] = useState(activeItem);

  function handleChange(e) {
    console.log("핸들체인지");
    let { name, value } = e.target;

    const activeItem = { ...activeItem2, [name]: value };
    setActiveItem(activeItem);
  }

  return (
    <div>
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Post </ModalHeader>
        <ModalBody>
          <Form>
            {/* 3 formgroups
            1 title label */}
            <FormGroup>
              <Label for="postTitle">Title</Label>
              <Input type="text" name="postTitle" value={activeItem2.postTitle} onChange={e => handleChange(e)} placeholder="Enter Post Title" />
            </FormGroup>

            {/* 2 description label */}
            <FormGroup>
              <Label for="postContent">Description</Label>
              <Input type="text" name="postContent" value={activeItem2.postContent} onChange={handleChange} placeholder="Enter Post Content" />
            </FormGroup>
          </Form>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    // <div style={{ width: "1000px", position: "fixed", zIndex: "1", backgroundColor: "white", margin: "0" }}>
    //   <Modal.Dialog size="lg">
    //     <Modal.Header>
    //       <Modal.Title>제목</Modal.Title>
    //       <InputGroup style={{ width: "50vw", margin: "auto", marginTop: "30px" }}>
    //         {/* <FormControl type="text" name="title" value={activeItem.title} onChange={handleChange} placeholder="Enter Post Title" /> */}
    //       </InputGroup>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <Modal.Title>내용</Modal.Title>
    //       <InputGroup style={{ width: "50vw", margin: "auto", marginTop: "30px" }}>
    //         {/* <FormControl type="text" name="content" value={activeItem.content} onChange={handleChange} placeholder="Enter Post Content" /> */}
    //       </InputGroup>
    //     </Modal.Body>

    //     <Modal.Footer>
    //       <Button variant="dark">Posting</Button>
    //       <Button variant="secondary">Close</Button>
    //     </Modal.Footer>
    //   </Modal.Dialog>
    // </div>
  );
}

export default CreatePost;
