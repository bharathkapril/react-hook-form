import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

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
  age: 0;
  dob: Date;
};

const YoutubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty },
    watch,
    getValues,
    setValue,
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
      age: 0,
      dob: new Date(),
    },
  });

  console.log("first", { touchedFields, dirtyFields, isDirty });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  // const {name,ref,onChange,onBlur} = register("username")
  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  // const watchUsername = watch(["username","email"])

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const handleGetValues = () => {
    // console.log("Get Values", getValues())
    // console.log("Get twitter Values: ", getValues("social.twitter"))
    console.log("Get twitter Values: ", getValues(["username", "channel"]));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onError = (error: FieldErrors<FormValues>) => {
    console.log("Form Errors", error)
  }

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* <h1>Watch username {watchUsername}</h1> */}
      <form
        className="flex flex-col justify-center items-center gap-2 [&_input]:w-[360px] [&_input]:px-3 [&_input]:py-[6px] [&_input]:border [&_input]:border-[#ccc] [&_input]:rounded font-normal leading-6 text-lg [&_label]:text-white"
        onSubmit={handleSubmit(onSubmit, onError)}
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
          {...register("social.twitter", {
            required: "Twitter is required",
            // disabled: true,
            disabled: watch("channel") === "",
          })}
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
                type="text"
                className="mb-1"
                {...register(`phNumbers.${index}.number` as const)}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="bg-red-600 flex px-1 py-2 rounded flex-[1_0_0] mb-1"
                  onClick={() => remove(index)}
                >
                  Remove phone number
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-yellow-600 flex px-1 py-2 rounded flex-[1_0_0]"
            onClick={() => append({ number: "" })}
          >
            Add phone number
          </button>
        </div>
        <label htmlFor="age">age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            required: "age is required",
            valueAsNumber: true,
          })}
        />
        <p className="text-red-400">{errors.age?.message}</p>
        <label htmlFor="dob">dob</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            required: "dob is required",
            valueAsDate: true,
          })}
        />
        <p className="text-red-400">{errors.dob?.message}</p>
        <button className="bg-green-600 flex px-1 py-2 rounded flex-[1_0_0]">
          Submit
        </button>
        <button
          type="button"
          onClick={handleGetValues}
          className="bg-orange-600 flex px-1 py-2 rounded flex-[1_0_0]"
        >
          Get Values
        </button>
        <button
          type="button"
          onClick={handleSetValue}
          className="bg-lime-500 flex px-1 py-2 rounded flex-[1_0_0]"
        >
          Set Value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
