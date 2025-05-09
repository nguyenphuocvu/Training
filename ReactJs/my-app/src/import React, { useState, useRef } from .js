import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button, Card, Avatar, Tooltip } from 'antd';
import {
  PlusOutlined,
  UserOutlined,
  CheckSquareOutlined, // Task icon
  BugOutlined,         // Bug icon
  BookOutlined,        // Story icon
  ArrowUpOutlined,     // High priority
  ArrowRightOutlined,  // Medium priority (using this as Antd doesn't have a clear equals)
  ArrowDownOutlined,   // Low priority
} from '@ant-design/icons';
import CreateTicketModal, { TicketFormData } from './CreateTicketModal';

// Define Issue Types
export type IssueType = 'Task' | 'Bug' | 'Story';

// Keep Ticket interface here as it's used solely by KanbanBoard now
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  issueType: IssueType;
  createdAt: Date;
}

interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}

// Helper to create dates easily
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};


const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'TO DO',
    tickets: [
      {
        id: 'TASK-1',
        title: 'Thiết kế giao diện hộp thoại chat trên website',
        description: 'Tạo layout UI mới cho hộp chat để phù hợp với brand hiện tại.',
        priority: 'low',
        issueType: 'Task',
        createdAt: daysAgo(2),
      },
      {
        id: 'TASK-2',
        title: 'Lên wireframe cho trang Liên hệ',
        description: 'Phác thảo bố cục cơ bản và các thành phần cho trang Liên hệ.',
        priority: 'medium',
        issueType: 'Story',
        createdAt: daysAgo(1),
      },
      {
        id: 'TASK-3',
        title: 'Tối ưu màu sắc và font chữ cho trang chủ',
        description: 'Đảm bảo màu sắc và typography tuân theo guidelines thương hiệu.',
        priority: 'high',
        issueType: 'Bug',
        createdAt: daysAgo(0),
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'IN PROGRESS',
    tickets: [
      {
        id: 'TASK-4',
        title: 'Tạo prototype cho chức năng đăng ký tài khoản',
        description: 'Dùng Figma để mô phỏng luồng người dùng đăng ký trên desktop và mobile.',
        priority: 'medium',
        issueType: 'Task',
        createdAt: daysAgo(3),
      },
      {
        id: 'TASK-5',
        title: 'Điều chỉnh responsive cho phần header',
        description: 'Fix lỗi vỡ layout header trên các thiết bị nhỏ hơn 360px.',
        priority: 'low',
        issueType: 'Task',
        createdAt: daysAgo(1),
      },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    tickets: [
      {
        id: 'TASK-6',
        title: 'Cập nhật icon mới cho toàn bộ hệ thống',
        description: 'Thay thế các biểu tượng cũ bằng bộ icon mới thống nhất.',
        priority: 'high',
        issueType: 'Bug',
        createdAt: daysAgo(5),
      },
    ],
  },
];


const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const nextTaskNumber = useRef<number>(initialColumns.reduce((max, col) => max + col.tickets.length, 0) + 1);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // Reordering within the same column
    if (source.droppableId === destination.droppableId) {
      const column = columns.find(col => col.id === source.droppableId);
      if (!column) return;

      const newTickets = Array.from(column.tickets);
      const [removed] = newTickets.splice(source.index, 1);
      newTickets.splice(destination.index, 0, removed);

      setColumns(columns.map(col => 
        col.id === source.droppableId 
          ? { ...col, tickets: newTickets }
          : col
      ));
    } else { // Moving to a different column
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      
      if (!sourceColumn || !destColumn) return;

      const sourceTickets = Array.from(sourceColumn.tickets);
      const destTickets = Array.from(destColumn.tickets);
      const [removed] = sourceTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tickets: sourceTickets };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tickets: destTickets };
        }
        return col;
      }));
    }
  };

  const handleCreateTicket = (ticketData: TicketFormData) => {
    const newTicket: Ticket = {
      id: `TASK-${nextTaskNumber.current}`,
      title: ticketData.title,
      description: ticketData.description,
      priority: ticketData.priority,
      issueType: ticketData.issueType,
      createdAt: new Date(),
    };
    nextTaskNumber.current++;
    setColumns(columns.map(col =>
      col.id === 'todo'
        ? { ...col, tickets: [...col.tickets, newTicket] }
        : col
    ));
    setIsCreateModalOpen(false);
  };

  const handleUpdateTicket = (updatedTicketData: TicketFormData) => {
    if (!editingTicket) return;

    const updatedTicket: Ticket = {
      ...editingTicket,
      title: updatedTicketData.title,
      description: updatedTicketData.description,
      priority: updatedTicketData.priority,
      issueType: updatedTicketData.issueType,
    };

    setColumns(columns.map(column => ({
      ...column,
      tickets: column.tickets.map(ticket =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      ),
    })));

    setIsEditModalOpen(false);
    setEditingTicket(null);
  };

  const handleOpenEditModal = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTicket(null);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Tooltip title="High Priority"><ArrowUpOutlined style={{ color: 'red' }} /></Tooltip>;
      case 'medium':
        return <Tooltip title="Medium Priority"><ArrowRightOutlined style={{ color: 'orange' }} /></Tooltip>;
      case 'low':
        return <Tooltip title="Low Priority"><ArrowDownOutlined style={{ color: 'green' }} /></Tooltip>;
      default:
        return null;
    }
  };

  const getIssueTypeIcon = (issueType: IssueType) => {
    switch (issueType) {
      case 'Task':
        return <Tooltip title="Task"><CheckSquareOutlined style={{ color: 'blue' }} /></Tooltip>;
      case 'Bug':
        return <Tooltip title="Bug"><BugOutlined style={{ color: 'red' }} /></Tooltip>;
      case 'Story':
        return <Tooltip title="Story"><BookOutlined style={{ color: 'green' }} /></Tooltip>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white h-full flex flex-col">
      <div className="mb-4 w-full flex justify-end shrink-0">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Ticket
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 flex-grow min-h-0"> {/* Flex layout for columns */}
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col w-1/3 bg-gray-100 rounded-lg shadow">
              <h2 className="text-sm font-semibold text-gray-600 p-3 border-b border-gray-200 shrink-0">
                {column.title} <span className="text-gray-400 font-normal">{column.tickets.length}</span>
              </h2>
              <Droppable droppableId={column.id} isDropDisabled={false}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-grow p-3 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-100'}`}
                  >
                    {column.tickets.map((ticket, index) => (
                      <Draggable
                        key={ticket.id}
                        draggableId={ticket.id}
                        index={index}
                      >
                        {(providedDraggable, snapshotDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                            className={`mb-3 ${snapshotDraggable.isDragging ? 'shadow-lg' : ''}`}
                            onDoubleClick={() => handleOpenEditModal(ticket)}
                          >
                            <Card 
                              size="small"
                              bodyStyle={{ padding: '12px' }}
                              className="bg-white hover:shadow-md cursor-pointer"
                            >
                              <div className="text-xs text-gray-500 mb-1">{ticket.id}</div>
                              <div className="text-sm mb-2">{ticket.title}</div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {getIssueTypeIcon(ticket.issueType)}
                                  {getPriorityIcon(ticket.priority)}
                                </div>
                                <Avatar size={24} icon={<UserOutlined />} /> {/* Placeholder Avatar */}
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <CreateTicketModal
        mode="create"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTicket={handleCreateTicket}
      />

      {editingTicket && (
        <CreateTicketModal
          mode="edit"
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          initialData={editingTicket}
          onUpdateTicket={handleUpdateTicket}
        />
      )}
    </div>
  );
};

export default KanbanBoard; 