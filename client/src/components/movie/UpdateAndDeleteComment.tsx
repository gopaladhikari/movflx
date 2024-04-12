"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FaFlag } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { deleteCommentById, updateCommentById } from "@/lib/comments";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TTextSchema, textSchema } from "@/schemas/updateCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  id: string;
  isCommenter: boolean;
  text: string;
  children: ReactNode;
};
export function UpdateAndDeleteComment({
  id, // This is comment id
  isCommenter,
  text,
  children,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TTextSchema>({
    resolver: zodResolver(textSchema),
  });

  const handleDelete = async (closeModal: () => void) => {
    setLoading(true);
    await deleteCommentById(id);
    setLoading(false);
    closeModal();
  };

  const onUpdateComment: SubmitHandler<TTextSchema> = async ({
    text: newText,
  }) => {
    const res = await updateCommentById(id, newText);
    if (res) setShowInput(false);
  };

  useEffect(() => {
    if (ref.current && showInput) {
      const inputEl = ref.current.querySelector("input");
      inputEl?.focus();
    } else if (ref.current && !showInput) {
      const inputEl = ref.current.querySelector("input");
      inputEl?.blur();
    }
  }, [showInput]);

  return (
    <>
      <div className="w-full space-y-2">
        {children}
        {showInput ? (
          <form
            className="flex w-full flex-col gap-3"
            onSubmit={handleSubmit(onUpdateComment)}
          >
            <Input
              baseRef={ref}
              radius="full"
              fullWidth
              variant="underlined"
              size="lg"
              defaultValue={text}
              {...register("text")}
            />
            <div className="flex items-center justify-end gap-4">
              <Button
                className="data-[focus-visible=true]:outline-0"
                variant="light"
                size="sm"
                onPress={() => setShowInput(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="data-[focus-visible=true]:outline-0"
                variant="bordered"
                size="sm"
              >
                {loading ? "Loading" : "Update"}
              </Button>
            </div>
            {errors.text && (
              <p className="text-sm text-red-500">{errors.text.message}</p>
            )}
          </form>
        ) : (
          <p>{text}</p>
        )}
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            size="sm"
            className="data-[focus-visible=true]:outline-0"
          >
            <HiDotsVertical />
          </Button>
        </DropdownTrigger>
        {isCommenter ? (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              className="text-sm"
              onPress={() => setShowInput(true)}
            >
              <span className="flex items-center gap-2">
                <MdEdit /> Edit
              </span>
            </DropdownItem>
            <DropdownItem
              className="text-danger"
              color="danger"
              onPress={onOpen}
            >
              <span className="flex items-center gap-2">
                <MdDelete /> Delete
              </span>
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem className="text-sm">
              <span className="flex items-center gap-2">
                <FaFlag /> Report
              </span>
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Comment
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this comment?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  variant="light"
                  onClick={onModalClose}
                  className="data-[focus-visible=true]:outline-0"
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  isLoading={loading}
                  onClick={() => handleDelete(onModalClose)}
                  className="data-[focus-visible=true]:outline-0"
                >
                  {loading ? "Loading..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
