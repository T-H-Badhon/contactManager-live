import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import logo from "../assets/person-dummy.jpg";
import { useUpdateContactMutation } from "../redux/api/contactApi/contactApi";
import { TContact, TError, TUpdateContact } from "../types/dataTypes";
import SuccessToast from "./toasts/SuccessToast";
import FailedToast from "./toasts/FailedToast";
import { BounceLoader } from "react-spinners";

const UpdateModal = ({ contact }: { contact: TContact }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [File, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const formData = new FormData();

  const [UpdateContact, { data, error }] = useUpdateContactMutation();

  const imageshower = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      phoneNumber: { value: string };
      email: { value: string };
      address: { value: string };
      photoUrl: { value: string };
    };

    const name = target?.name.value as string;
    const phoneNumber = target.phoneNumber.value;
    const email = target.email.value;
    const address = target.address.value;
    const photoUrl = target.photoUrl.value;

    const textData: TUpdateContact = {};
    if (name) {
      textData.name = name;
    }
    if (phoneNumber) {
      textData.phoneNumber = phoneNumber;
    }
    if (email) {
      textData.email = email;
    }
    if (address) {
      textData.address = address;
    }

    if (photoUrl) {
      textData.photoUrl = photoUrl;
    }

    formData.append("file", File as File);
    formData.append("data", JSON.stringify(textData));

    const updateData = {
      id: contact._id,
      formData,
    };
    setLoading(true);
    const res = await UpdateContact(updateData);

    if (res) {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Update</button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        {loading ? (
          <h1>
            <BounceLoader className="mx-auto" color="#36d7b7" />
          </h1>
        ) : null}
        <Modal.Body>
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold mt-5">
            Update contact
          </h1>
          <div className="container mx-auto   mt-5 p-3">
            {data?.success === true ? (
              <SuccessToast message={data.message} key={1}></SuccessToast>
            ) : null}
            {error ? (
              <FailedToast error={error as TError} key={2}></FailedToast>
            ) : null}

            <form
              onSubmit={onSubmit}
              className="grid grid-cols-6 gap-4 mx-auto max-w-2xl shadow-lg rounded-xl p-2"
            >
              <div className="col-span-6 flex justify-between items-center bg-gray-200 rounded-lg p-2">
                <div>
                  <div>
                    <div>
                      <div className="mb-2  flex">
                        <Label
                          htmlFor="file-upload-helper-text"
                          value="Upload file(only for Local host) :"
                        />
                        <h1 className="text-red-600 text-xl">*</h1>
                      </div>
                      <FileInput
                        typeof="file"
                        id="file"
                        onChange={imageshower}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="mb-2  flex">
                        <Label
                          htmlFor="file-upload-helper-text"
                          value="Profie photo URL :"
                        />
                        <h1 className="text-red-600 text-xl">*</h1>
                      </div>
                      <TextInput type="text" id="photoUrl" />
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <img
                    src={imageSrc || contact?.ProfilePhoto || logo}
                    alt="Selected"
                    className="w-40 h-40"
                  />
                </div>
              </div>
              <div className="md:col-span-3 col-span-6">
                <div className="mb-2  flex">
                  <Label htmlFor="name" value="Contact name :" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  defaultValue={data?.data?.name || contact?.name}
                  placeholder="Contact name"
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <div className="mb-2  flex">
                  <Label htmlFor="phoneNumber" value="Contact No. :" />
                </div>
                <TextInput
                  id="phoneNumber"
                  type="text"
                  defaultValue={data?.data?.phoneNumber || contact?.phoneNumber}
                  placeholder="017XXXXXXXX"
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email :" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  defaultValue={data?.data?.email || contact?.email}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <div className="mb-2  flex">
                  <Label htmlFor="address" value="Address :" />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  defaultValue={data?.data?.address || contact?.address}
                  placeholder="address"
                />
              </div>

              <div className="flex justify-around  col-span-6">
                <Button type="submit">Submit</Button>
                <Button onClick={() => setOpenModal(false)}>Close</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateModal;
