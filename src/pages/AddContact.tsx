import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import logo from "../assets/person-dummy.jpg";
import { useAddContactMutation } from "../redux/api/contactApi/contactApi";
import FailedToast from "../components/toasts/FailedToast";
import { TError } from "../types/dataTypes";
import SuccessToast from "../components/toasts/SuccessToast";
import { BounceLoader } from "react-spinners";
import { addContactSchema } from "../validationSchema/schemas";
import ErrorToast from "../components/toasts/ErrorToast";

const AddContact = () => {
  const [File, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validateError, setValidateError] = useState("");

  const formData = new FormData();

  const [AddContact, { data, error }] = useAddContactMutation();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePhotoUrl = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget?.value) {
      setImageSrc(e.currentTarget.value);
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
    const form = e.currentTarget;
    const textData = {
      name,
      phoneNumber,
      email,
      address,
      photoUrl,
    };

    if (!File) {
      const result = addContactSchema.safeParse(textData);
      if (result?.error) {
        setValidateError(result.error?.issues[0].message);
        return;
      }
    }

    formData.append("file", File as File);
    formData.append("data", JSON.stringify(textData));
    setLoading(true);
    const res = await AddContact(formData);

    if (res?.data?.success) {
      setLoading(false);
      form.reset();
      setImageSrc("");
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <h1>
          <BounceLoader className="mx-auto" color="#36d7b7" />
        </h1>
      ) : null}
      <div className="container mx-auto lg:px-28 lg:mt-15 md:mt-10 mt-5">
        {data?.success === true ? (
          <SuccessToast message={data.message} key={1}></SuccessToast>
        ) : null}
        {error ? (
          <FailedToast error={error as TError} key={2}></FailedToast>
        ) : null}
        {validateError ? (
          <ErrorToast message={validateError}></ErrorToast>
        ) : null}

        <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-bold">
          Add Contact
        </h1>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-6 gap-4 mx-auto max-w-2xl shadow-lg rounded-xl p-2"
        >
          <div className="col-span-6 flex justify-between items-center bg-gray-200 rounded-lg p-2">
            <div>
              <div>
                <div className="mb-2  flex">
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Upload file(only for Local host) :"
                  />
                  <h1 className="text-red-600 text-xl">*</h1>
                </div>
                <FileInput typeof="file" id="file" onChange={imageshower} />
              </div>
              <div className="mt-2">
                <div className="mb-2  flex">
                  <Label
                    htmlFor="file-upload-helper-text"
                    value="Profie photo URL :"
                  />
                  <h1 className="text-red-600 text-xl">*</h1>
                </div>
                <TextInput onBlur={handlePhotoUrl} type="text" id="photoUrl" />
              </div>
            </div>
            <div className="col-span-4">
              <img
                src={imageSrc || logo}
                alt="Selected"
                className="w-40 h-40"
              />
            </div>
          </div>
          <div className="md:col-span-3 col-span-6">
            <div className="mb-2  flex">
              <Label htmlFor="name" value="Contact name :" />
              <h1 className="text-red-600 text-xl">*</h1>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Contact name"
              required
            />
          </div>
          <div className="md:col-span-3 col-span-6">
            <div className="mb-2  flex">
              <Label htmlFor="phoneNumber" value="Contact No. :" />
              <h1 className="text-red-600 text-xl">*</h1>
            </div>
            <TextInput
              id="phoneNumber"
              type="text"
              placeholder="017XXXXXXXX"
              required
            />
          </div>
          <div className="md:col-span-3 col-span-6">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email :" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="md:col-span-3 col-span-6">
            <div className="mb-2  flex">
              <Label htmlFor="address" value="Address :" />
              <h1 className="text-red-600 text-xl">*</h1>
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="address"
              required
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default AddContact;
