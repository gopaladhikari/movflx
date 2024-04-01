"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function SessionExpiredModal() {
  const [showModal, setShowModal] = useState(true);
  const { onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Modal backdrop="blur" isOpen={showModal} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Session is expired
            </ModalHeader>
            <ModalBody>
              <p>Please login again to new the session</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setShowModal(false)}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  setShowModal(false);
                  router.push("/auth/login");
                }}
              >
                Okay
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
