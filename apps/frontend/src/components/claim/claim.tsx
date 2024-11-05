'use client';

import { getNames } from 'country-list';
import moment from 'moment';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '@frontend/components/claim/input';
import Select from '@frontend/components/claim/select';
import { useForm, FormProvider } from 'react-hook-form';

export const Form: FC<{ prizes: any[] }> = (props) => {
  const { prizes } = props;
  const all = useForm({});

  const onSubmit = (data: any) => {
    (async () => {
      const newData = await fetch('/api/dashboard/claim', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...data,
          type: Array.isArray(data.type) ? data.type : [data.type],
        }),
      });

      const { invalid } = await newData.json();
      if (invalid) {
        alert('Error collecting swag');
      }

      alert('Swag collected successfully!');
      window.location.reload();
    })();
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-inter mx-auto font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        Claim your prize! 🏆
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <FormProvider {...all}>
            <form
              className="safe-paddings relative mb-20 min-h-[600px]"
              onSubmit={all.handleSubmit(onSubmit)}
            >
              <WrapperForm prizes={prizes} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export const WrapperForm: FC<{ prizes: any[] }> = (props) => {
  const { prizes } = props;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  return (
    <>
      <div className="mb-7">
        Select Prizes to claim:
        {prizes.map((winner: any, index: number) => (
          <div key={index} className="my-2 flex">
            <div>
              <input
                disabled={isSubmitSuccessful}
                {...register('type', { required: true })}
                name="type"
                value={winner.id}
                type="checkbox"
              />
            </div>
            <div className="ml-2">
              {winner.type === 'code' && 'Competition Winner'}
              {winner.type === 'nocode' && 'NoCode Winner'}
              {winner.type === 'giveaway' && 'Competition Giveaway'}- Expires on{' '}
              {moment
                .utc(winner.lastDateClaim)
                .local()
                .format('DD/MM/YYYY HH:mm')}
            </div>
          </div>
        ))}
        {!!errors.type && (
          <div className="mt-3" style={{ color: 'red' }}>
            You must select a prize to claim
          </div>
        )}
      </div>
      <Input
        name="first_name"
        extra={{ minLength: 2, required: true }}
        label="First Name"
      />
      <Input
        extra={{ minLength: 2, required: true }}
        label="Last Name"
        name="last_name"
      />
      <Input
        extra={{
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
        }}
        label="Email"
        type="text"
        name="email"
      />
      <Input
        label="Phone Number"
        name="phone_number"
        placeHolder="+972"
        extra={{
          required: true,
          pattern:
            /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/i,
        }}
      />
      <Input
        extra={{ minLength: 5, required: true }}
        label="Address"
        name="shipping_address1"
      />
      <Input label="Address 2" name="shipping_address2" />
      <Input
        extra={{ required: true, minLength: 2 }}
        label="City"
        name="shipping_city"
      />
      <Select label="Country" name="shipping_country">
        <option value="">-- Choose Country --</option>
        {getNames().map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Input extra={{ required: true }} label="State" name="shipping_state" />
      <Input
        extra={{ required: true, minLength: 3 }}
        label="ZIP"
        name="shipping_zip"
      />
      <Select label="Shirt Size" name="shirt_size">
        <option value="">-- Choose Shirt Size --</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="X-Large">Extra Large</option>
        <option value="2X-Large">2 Extra Large</option>
      </Select>
      <button
        type="submit"
        disabled={isSubmitSuccessful}
        className={`${
          isSubmitSuccessful && 'pointer-events-none opacity-50'
        } cta-btn-animation relative flex max-w-full cursor-pointer items-center justify-center leading-none`}
      >
        <svg
          className="cta-btn-animation-border xs:w-full"
          width="200"
          height="59"
          viewBox="0 0 268 59"
          fill="none"
        >
          <path
            d="M1 58V1H251.586L267 16.4142V58H1Z"
            stroke="white"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center space-x-2.5">
          <span className="text-lg sm:text-[18px]">Claim Swag!</span>
        </div>
      </button>
    </>
  );
};
