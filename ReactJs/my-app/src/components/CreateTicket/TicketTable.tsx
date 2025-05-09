import React, { useState } from "react";
// import "./ticket.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button, Card, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import CreateTicketModal from "./CreateTicketModal";

const TicketTable = () => {
  const [isCreateTicket, setIsCreateTicket] = useState(false);
  const [isEditTicket, setIsEditTicket] = useState(false);
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };
  const handleCreateTicket = () => {

  };
  const handleEditTicket = () => {
    
  }
  return (
    <>
      <div className="p-4 flex bg-white h-full flex-col ">
        <div className="mb-4 w-full flex justify-end shrink-0">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateTicket(true)}
          >
            Add Ticket
          </Button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 flex-col min-h-0">
            <div className="flex flex-col w-1/3 bg-gray-100 rounded-lg shadow">
              <h2 className="text-sm  font-semibold text-gray-600 p-3 border-b border-gray-200 shrink-0">
                <span className="text-gray-400 font-normal">Ok</span>
              </h2>

              {/* <Droppable> */}
              <div className="flex-grow p-3 overflow-y-auto">
                {/* <Draggable> */}
                <div className="mb-3">
                  <Card className="bg-white hover:shadow-md cursor-pointer">
                    <div className="text-xs text-gray-500 mb-1"></div>
                    <div className="text-sm mb-2">Test</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar size={24} icon={<UserOutlined />} />
                      </div>
                    </div>
                  </Card>
                </div>
                {/* </Draggable> */}
              </div>
              {/* </Droppable> */}
            </div>
          </div>
        </DragDropContext>

        <CreateTicketModal
          mode="create"
          isOpen={isCreateTicket}
          onClose={() => setIsCreateTicket(false)}
          onCreateTicket={handleCreateTicket}
        />
        {isEditTicket && (
          <CreateTicketModal
            mode="edit"
            isOpen={isEditTicket}
            onClose={() => setIsEditTicket(false)}
            onCreateTicket={handleEditTicket}
          />
        )}
      </div>
    </>
  );
};

export default TicketTable;
