import { Menu, Transition } from "@headlessui/react";
import { format, parseISO } from "date-fns";
import { VerticalDot } from "../../assets/verticalDot";
import { Fragment, useState } from "react";
import { classNames } from "../../utils/classNames";
import { deleteEvent } from "../../requests/event.requests";
import { Loader } from "../Loaders/Loader";

export const Event = ({ event, setEvents }) => {
  let startDateTime = parseISO(event.startedAt);
  let endDateTime = parseISO(event.finishedAt);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteEvent = async (id) => {
    try {
      setIsLoading(true)
      await deleteEvent(id);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={'./image/avatar.svg'}
        alt=""
        className="flex-none w-10 h-10 rounded-full" /><div className="flex-auto">
        <p className="text-gray-900">{event.name}</p>
        <p className="mt-0.5">
          <time dateTime={event.startedAt}>
            {format(startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          {event.finishedAt.length > 0
            ? (
              <time dateTime={event.finishedAt}>
                {format(endDateTime, "h:mm a")}
              </time>
            )
            : (
              'Not selected'
            )}
        </p>
      </div>
      {isLoading ? <Loader /> :
        <>
          <Menu
            as="div"
            className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
          >
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <VerticalDot />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm cursor-pointer"
                        )}
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      }
    </li>
  );
}