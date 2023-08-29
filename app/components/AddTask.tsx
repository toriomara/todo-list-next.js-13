'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    evt
  ) => {
    evt.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setIsModalOpen(false);
    setNewTaskValue('');
    router.refresh();
  };

  return (
    <div>
      <button className='btn btn-primary w-full' onClick={handleModalOpen}>
        Add new task <AiOutlinePlus className='ml-1' size={18} />
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input
              className='input input-bordered w-full'
              type='text'
              placeholder='Type here'
              value={newTaskValue}
              onChange={(evt) => setNewTaskValue(evt.target.value)}
            />
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
