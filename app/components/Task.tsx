'use client';

import { ITask } from '@/types/tasks';
import { FormEventHandler, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEWditTodo: FormEventHandler<HTMLFormElement> = async (
    evt
  ) => {
    evt.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr className='bg-base-200' key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-5'>
        <FiEdit
          className='text-blue-500'
          size={18}
          cursor='pointer'
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal isModalOpen={openModalEdit} setIsModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEWditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                className='input input-bordered w-full'
                type='text'
                placeholder='Type here'
                value={taskToEdit}
                onChange={(evt) => setTaskToEdit(evt.target.value)}
              />
              <button className='btn' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FiTrash2
          className='text-red-500'
          size={18}
          cursor='pointer'
          onClick={() => setOpenModalDeleted(true)}
        />
        <Modal
          isModalOpen={openModalDeleted}
          setIsModalOpen={setOpenModalDeleted}
        >
          <h3 className='text-lg'>Are you sure, you want delete this task?</h3>
          <div className='modal-action'>
            <button className='btn' onClick={() => handleDeleteTask(task.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
