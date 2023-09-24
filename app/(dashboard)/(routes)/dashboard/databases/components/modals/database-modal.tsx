"use client";

import { Modal } from "@/components/ui/modal";
import { DatabaseForm } from "../database-form";


interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalId: any;
}

export const DatabaseModal = ({ isOpen, onClose, portalId }: DatabaseModalProps) => {

  return (
    <Modal
      title="Create Database Connection"
      description="Add a new database connection that can be used to show data in HubSpot"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <DatabaseForm portalId={portalId} create={true}/>
        </div>
      </div>
    </Modal>
  );
};