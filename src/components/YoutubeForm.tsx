import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// let renderCount =0

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

const YoutubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  // const {name,ref,onChange,onBlur} = register("username")
  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <form
        className="flex flex-col justify-center items-center gap-2 [&_input]:w-[360px] [&_input]:px-3 [&_input]:py-[6px] [&_input]:border [&_input]:border-[#ccc] [&_input]:rounded font-normal leading-6 text-lg [&_label]:text-white"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
        />{" "}
        {/* name={name} ref={ref} onChange={onChange} onBlur={onBlur} */}
        <p className="text-red-400">{errors.username?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Invaild email address",
            },
            validate: {
              notAdmin: (fieldVales) => {
                return (
                  fieldVales !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldVales) => {
                return (
                  !fieldVales.endsWith("blacklist.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className="text-red-400">{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "Channel is required" })}
        />
        <p className="text-red-400">{errors.channel?.message}</p>
        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", { required: "Twitter is required" })}
        />
        <p className="text-red-400">{errors.social?.twitter?.message}</p>
        <label htmlFor="facebook">facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook", { required: "Facebook is required" })}
        />
        <p className="text-red-400">{errors.social?.facebook?.message}</p>
        <label htmlFor="primary-phone">primary-phone</label>
        <input
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0", {
            required: "Primary number is required",
          })}
        />
        <p className="text-red-400">{errors.phoneNumbers?.[0]?.message}</p>
        <label htmlFor="secondary-phone">secondary-phone</label>
        <input
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1", {
            required: "Secondary number is required",
          })}
        />
        <p className="text-red-400">{errors.phoneNumbers?.[1]?.message}</p>
        <div>
          <label htmlFor="">List of phone numbers</label>
          {fields.map((field, index) => (
            <div className="gap-1 flex flex-col" key={field.id}>
              <input
                type="text" className="mb-1"
                {...register(`phNumbers.${index}.number` as const)}
              />
              {index > 0 && (
              <button type="button" className="bg-red-600 flex px-1 py-2 rounded flex-[1_0_0] mb-1" onClick={() => remove(index)}>Remove phone number</button>
              )}
            </div>
          ))}
          <button type="button" className="bg-yellow-600 flex px-1 py-2 rounded flex-[1_0_0]" onClick={() => append({number:""})}>Add phone number</button>
        </div>
        <button className="bg-green-600 flex px-1 py-2 rounded flex-[1_0_0]">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
