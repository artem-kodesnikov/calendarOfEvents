import React, { useRef, useState } from 'react';
import { validationSchema } from '../../validation/event';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TimePicker } from '../TimePicker/TimePicker';
import { createNewEvent } from '../../requests/event.requests';
import { Loader } from '../Loader/Loader';

export const NewEventForm = ({ setIsOpenModal, setEvents }) => {
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef(null);
  const initialValues = {
    name: '',
    startedAt: '',
    finishedAt: '',
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await createNewEvent(values);
      setEvents(prevEvents => [...prevEvents, values]);
      setIsOpenModal(false);
    } catch (error) {
      console.error('Error creating new event:', error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <div className="mt-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
            <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <Field className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6" type="text" id="name" name="name" />
          </div>
          <ErrorMessage name="name" component="div" className="text-red-500" />
        </div>
        <div>
          <TimePicker name='startedAt' label={'Started at'} required={true} />
          <ErrorMessage name="startedAt" component="div" className="text-red-500" />
        </div>
        <div>
          <TimePicker name='finishedAt' label={'Finished at'} />
          <ErrorMessage name="finishedAt" component="div" className="text-red-500" />
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-32"
          >
            {isLoading ? <Loader /> : 'Complete'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpenModal(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
