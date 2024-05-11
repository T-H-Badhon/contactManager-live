import { useGetContactsQuery } from "../redux/api/contactApi/contactApi";
import { TContact } from "../types/dataTypes";
import ContactCard from "../components/ContactCard";
import NotFound from "../components/NotFound";
import { TextInput } from "flowbite-react";
import { useState } from "react";

const AllContact = () => {
  const [searchTerm, setSearchTerm] = useState({ searchTerm: "" });

  const { data: contacts } = useGetContactsQuery(searchTerm);

  const searcher = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearchTerm({ searchTerm: newValue });
  };

  return (
    <div className="container mx-auto lg:px-28">
      <h1 className="max-w-48 mt-5  mx-auto">
        <TextInput
          onChange={searcher}
          id="searchTerm"
          type="text"
          placeholder="search"
        />
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 md:mt-10 mt-5 mx-auto">
        {contacts?.data.length ? (
          contacts.data.map((contact: TContact) => (
            <ContactCard contact={contact} key={contact._id}></ContactCard>
          ))
        ) : (
          <div className="lg:col-span-4 md:col-span-3 col-span-1">
            <NotFound></NotFound>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContact;
