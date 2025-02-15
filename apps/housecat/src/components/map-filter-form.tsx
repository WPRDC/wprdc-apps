/**
 *
 * MapFilterMenu
 *
 */
"use client";

import { Field, FieldProps, Formik } from "formik";

import { FilterFormValues } from "@/types";

import {
  initValues,
  parcelDataSchema,
  projectDataSchema,
} from "@/schemata/map-filter";
import {
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { HiChevronUpDown } from "react-icons/hi2";
import { Button } from "@wprdc/ui";
import { useRouter } from "next/navigation";

interface Props {
  params: FilterFormValues;
}

export function MapFilterForm({ params }: Props) {
  const router = useRouter();

  /** Set querystring from params */
  async function handleSubmit(params: FilterFormValues) {
    // clear out null values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== null),
    );

    const queryString = new URLSearchParams(cleanParams).toString();
    router.push(`/watchlist?${queryString}`);
  }

  return (
    <div className="">
      <Formik<FilterFormValues>
        initialValues={initValues}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          function handleReset() {
            formikProps.resetForm();
            formikProps.submitForm();
          }

          return (
            <form
              onReset={formikProps.handleReset}
              onSubmit={formikProps.handleSubmit}
            >
              <p className="text-xl font-semibold">Filter using parcel data</p>

              <div className="grid w-fit grid-cols-1 gap-x-8 gap-y-4 py-4 lg:grid-cols-2">
                {Object.entries(parcelDataSchema).map(([slug, record]) => {
                  return (
                    <div key={slug}>
                      <Field name={slug}>
                        {({
                          field, // { name, value, onChange, onBlur }
                          meta,
                        }: FieldProps) => {
                          return (
                            <Select
                              id={slug}
                              name={field.name}
                              onBlur={field.onBlur}
                              selectedKey={field.value}
                              onSelectionChange={(x) => {
                                field.onChange({
                                  target: { value: x, name: field.name },
                                });
                              }}
                              className="flex w-[400px] flex-col gap-1"
                            >
                              <Label className="block cursor-default text-sm font-semibold text-stone-800">
                                {record.label}
                              </Label>
                              <Button className="pressed:bg-opacity-100 flex cursor-default items-center rounded border bg-white bg-opacity-90 py-2 pl-2 pr-1 text-left text-sm ring-white ring-offset-2 ring-offset-rose-700 transition focus:outline-none focus-visible:ring-2">
                                <SelectValue className="flex-1 truncate placeholder-shown:italic placeholder-shown:text-stone-800" />
                                <HiChevronUpDown />
                              </Button>
                              <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[--trigger-width] overflow-auto rounded bg-white text-base ring-1 ring-black/5">
                                <ListBox className="border-2 border-black p-2 font-mono">
                                  {record.items.map((item) => (
                                    <ListBoxItem
                                      key={item.id}
                                      id={item.id}
                                      className="cursor-default focus:bg-stone-200"
                                    >
                                      {item.label}
                                    </ListBoxItem>
                                  ))}
                                </ListBox>
                              </Popover>
                            </Select>
                          );
                        }}
                      </Field>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xl font-semibold">
                and/or using project data
              </p>

              <div className="grid w-fit grid-cols-1 gap-x-8 gap-y-4 py-4 lg:grid-cols-2">
                {Object.entries(projectDataSchema).map(([slug, record]) => {
                  return (
                    <div key={slug}>
                      <Field name={slug}>
                        {({
                          field, // { name, value, onChange, onBlur }
                          meta,
                        }: FieldProps) => {
                          return (
                            <Select
                              id={slug}
                              name={field.name}
                              onBlur={field.onBlur}
                              selectedKey={field.value}
                              onSelectionChange={(x) => {
                                field.onChange({
                                  target: { value: x, name: field.name },
                                });
                              }}
                              className="flex w-[400px] flex-col gap-1"
                            >
                              <Label className="block cursor-default text-sm font-semibold text-stone-800">
                                {record.label}
                              </Label>
                              <Button className="pressed:bg-opacity-100 flex cursor-default items-center rounded border bg-white bg-opacity-90 py-1 pl-2 pr-1 text-left text-sm ring-white ring-offset-2 ring-offset-rose-700 transition focus:outline-none focus-visible:ring-2">
                                <SelectValue className="flex-1 truncate placeholder-shown:italic placeholder-shown:text-stone-800" />
                                <HiChevronUpDown />
                              </Button>
                              <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[--trigger-width] overflow-auto rounded bg-white text-base ring-1 ring-black/5">
                                <ListBox className="border-2 border-black p-2 font-mono">
                                  {record.items.map((item) => (
                                    <ListBoxItem
                                      key={item.id}
                                      id={item.id}
                                      className="cursor-default focus:bg-stone-200"
                                    >
                                      {item.label}
                                    </ListBoxItem>
                                  ))}
                                </ListBox>
                              </Popover>
                            </Select>
                          );
                        }}
                      </Field>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                <Button type="submit" variant="primary" className="text-lg">
                  Apply Filters
                </Button>
                <Button onPress={handleReset} className="text-lg">
                  Reset
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
