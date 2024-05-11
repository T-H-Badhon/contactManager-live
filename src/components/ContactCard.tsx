import { TContact } from "../types/dataTypes";
import { Card } from "flowbite-react";
import UpdateModal from "./UpdateModal";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import {
  useChangeFavouriteStatusMutation,
  useDeleteContactMutation,
} from "../redux/api/contactApi/contactApi";

const ContactCard = ({ contact }: { contact: TContact }) => {
  const [ChangeFavouriteStatus] = useChangeFavouriteStatusMutation();

  const [DeleteContact] = useDeleteContactMutation();

  const chageStatus = () => {
    const statusData = {
      isFavourite: !contact.isFavourite,
    };
    const arg = {
      id: contact._id,
      statusData,
    };

    ChangeFavouriteStatus(arg);
  };

  const deleteContact = () => {
    DeleteContact(contact?._id);
  };

  return (
    <>
      <Card className="max-w-sm mx-auto">
        <div className="flex justify-between px-4 pt-4">
          <div>
            {contact?.isFavourite ? (
              <i className="fa-solid fa-star text-yellow-300"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </div>
          <div>
            <Menu
              className="space-y-2 min-w-28 "
              menuButton={<h1 className="p-1 bg-sky-400 rounded-lg">Menu</h1>}
            >
              <MenuItem>
                <button className="bg-sky-200 w-full rounded-lg my-1 p-2">
                  <UpdateModal
                    contact={contact}
                    key={contact?._id}
                  ></UpdateModal>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="bg-sky-200 w-full rounded-lg my-0 p-1"
                  onClick={chageStatus}
                >
                  <span className="text-xs">
                    {contact?.isFavourite
                      ? "Mark Unfavourite"
                      : "Mark as Favourite"}
                  </span>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="bg-sky-200 w-full rounded-lg my-1 p-2"
                  onClick={deleteContact}
                >
                  Delete
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="flex flex-col items-center pb-5">
          <img
            height="96"
            src={contact.ProfilePhoto}
            width="96"
            className="mb-3 rounded-2xl shadow-lg"
          />
          <div className="px-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1">Name</div>
              <div className="col-span-3">: {contact.name}</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">Email</div>
              <div className="col-span-3">
                :{" "}
                {contact?.email ? (
                  contact.email
                ) : (
                  <span className="text-red-600">Not added</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">Phone</div>
              <div className="col-span-3">: {contact.phoneNumber}</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">Address</div>
              <div className="col-span-3">: {contact.address}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ContactCard;
