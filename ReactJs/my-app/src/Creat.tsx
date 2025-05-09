import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space } from 'antd';
import {
  CheckSquareOutlined,
  BugOutlined,
  BookOutlined,
  ArrowUpOutlined,
  ArrowRightOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { IssueType, Ticket } from './KanbanBoard';

// Define the shape of form data
export interface TicketFormData {
  title: string;
  description: string;
  priority: string;
  issueType: IssueType;
}

// Helper function to get Issue Type Icon (similar to KanbanBoard)
const getIssueTypeIcon = (issueType: IssueType) => {
  switch (issueType) {
    case 'Task':
      return <CheckSquareOutlined style={{ color: 'blue', marginRight: '8px' }} />;
    case 'Bug':
      return <BugOutlined style={{ color: 'red', marginRight: '8px' }} />;
    case 'Story':
      return <BookOutlined style={{ color: 'green', marginRight: '8px' }} />;
    default:
      return null;
  }
};

// Helper function to get Priority Icon (similar to KanbanBoard)
const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <ArrowUpOutlined style={{ color: 'red', marginRight: '8px' }} />;
    case 'medium':
      return <ArrowRightOutlined style={{ color: 'orange', marginRight: '8px' }} />;
    case 'low':
      return <ArrowDownOutlined style={{ color: 'green', marginRight: '8px' }} />;
    default:
      return null;
  }
};

interface CreateTicketModalProps {
  mode: 'create' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  onCreateTicket?: (ticket: TicketFormData) => void;
  onUpdateTicket?: (ticket: TicketFormData) => void;
  initialData?: Ticket | null;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  mode,
  isOpen,
  onClose,
  onCreateTicket,
  onUpdateTicket,
  initialData = null,
}) => {
  const [form] = Form.useForm<TicketFormData>();

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        form.setFieldsValue({
          title: initialData.title,
          description: initialData.description,
          priority: initialData.priority,
          issueType: initialData.issueType,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, mode, initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (mode === 'edit' && onUpdateTicket) {
        onUpdateTicket(values);
      } else if (mode === 'create' && onCreateTicket) {
        onCreateTicket(values);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const modalTitle = mode === 'edit' ? `Edit Ticket ${initialData?.id || ''}` : 'Create New Ticket';
  const submitButtonText = mode === 'edit' ? 'Update' : 'Create';

  return (
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
        </Button>,
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={mode === 'create' ? { priority: 'medium', issueType: 'Task' } : undefined}
      >
        <Form.Item
          name="issueType"
          label="Issue Type"
          rules={[{ required: true, message: 'Please select issue type!' }]}
        >
          <Select>
            <Select.Option value="Task">
              <Space align="center">
                {getIssueTypeIcon('Task')}
                Task
              </Space>
            </Select.Option>
            <Select.Option value="Bug">
              <Space align="center">
                {getIssueTypeIcon('Bug')}
                Bug
              </Space>
            </Select.Option>
            <Select.Option value="Story">
              <Space align="center">
                {getIssueTypeIcon('Story')}
                Story
              </Space>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Summary"
          rules={[{ required: true, message: 'Please input ticket summary!' }]}
        >
          <Input placeholder="Enter ticket summary" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select priority!' }]}
        >
          <Select>
            <Select.Option value="low">
              <Space align="center">
                {getPriorityIcon('low')}
                Low
              </Space>
            </Select.Option>
            <Select.Option value="medium">
              <Space align="center">
                {getPriorityIcon('medium')}
                Medium
              </Space>
            </Select.Option>
            <Select.Option value="high">
              <Space align="center">
                {getPriorityIcon('high')}
                High
              </Space>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input ticket description!' }]}
        >
          <Input.TextArea
            placeholder="Enter ticket description"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTicketModal; 