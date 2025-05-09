import React  from "react";
import {IssueType , Ticket} from "./TicketTable";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Modal , Form , Button , Input , Select  , Space  } from "antd";
import {
    CheckSquareOutlined,
    BugOutlined,
    BookOutlined,
    ArrowUpOutlined,
    ArrowRightOutlined,
    ArrowDownOutlined,
  } from '@ant-design/icons';
import { title } from "process";
const CreateTicketModal = ({ mode, isOpen, onClose, onCreateTicket, form ,initialData = null}) => {
    const handleSubmit =  () => {

    }
    // Title New || Edit
    const modalTitle = mode === 'edit' ? `Edit Ticket ${initialData || '' }` : 'Create New Ticket';
    //Click Create || Edit
    const submitButtonText = mode === 'edit' ? 'Update' : 'Create';
  return (
    <div>
      <h2>{mode === "create" ? "Create Ticket" : "Edit Ticket"}</h2>

      <Modal
      title={modalTitle}
      open={isOpen}
      onCancel={onClose}
      destroyOnClose
      footer={[
         <Button key="cancel" onClick={onClose}> 
            Cancel
         </Button>,
         <Button key="submit" type="primary" onClick={handleSubmit}>
            {submitButtonText}
         </Button>
      ]}
      width={600}
      >
         <Form
         form={form}
         layout="vertical"
         initialValues={mode === 'create' ? {priority : 'medium' , issueType: 'Task'} : undefined}
         >
            <Form.Item>
                <Select>
                    <Select.Option >
                        <Space>Task</Space>
                    </Select.Option>
                    <Select.Option >
                        <Space>Bug</Space>
                    </Select.Option>
                    <Select.Option >
                        <Space>Story</Space>
                    </Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
              name="title"
              label="Summary"
              rules={[{required: true , message: 'Please input ticket summary!'}]}
            >
                <Input placeholder="Enter ticket summary"></Input>
            </Form.Item>


            <Form.Item>
                <Select>
                    <Select.Option>
                        <Space>Low</Space>
                    </Select.Option>
                    <Select.Option>
                        <Space>Medium</Space>
                    </Select.Option>
                    <Select.Option value="hight">
                        <Space align="center">
                            Hight
                        </Space>
                    </Select.Option>
                </Select>
            </Form.Item>


            <Form.Item
              name="description"
              label="Description"
              rules={[{required: true , message: 'Please input ticket description'}]}
            >
                <Input.TextArea
                    placeholder="Enter ticket description"
                    autoSize={{minRows: 4 , maxRows: 6}}
                />
            </Form.Item>
         </Form>
      </Modal>
    </div>
  );
};

export default CreateTicketModal;
