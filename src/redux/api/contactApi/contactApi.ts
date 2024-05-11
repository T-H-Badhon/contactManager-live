import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (contactData) => ({
        url: "contacts/add",
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["contacts"],
    }),
    getContacts: builder.query({
      query: (queries) => ({
        url: "contacts/",
        method: "GET",
        params: queries,
      }),
      providesTags: ["contacts"],
    }),
    updateContact: builder.mutation({
      query: (args) => {
        return {
          url: `contacts/update/${args.id}`,
          method: "PATCH",
          body: args.formData,
        };
      },
      invalidatesTags: ["contacts"],
    }),
    changeFavouriteStatus: builder.mutation({
      query: (args) => {
        return {
          url: `contacts/change-favourite-status/${args.id}`,
          method: "PATCH",
          body: args.statusData,
        };
      },
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useChangeFavouriteStatusMutation,
} = userApi;
