/**
 *
 * MapFilterMenu
 *
 */
import { Field, FieldProps, Formik } from "formik";

import styles from "./MapFilterMenu.module.css";

import { FilterFormValues } from "@/types";

import { initValues, schema } from "@/schemata/filter-schema";
import { Select } from "react-aria-components";
import { Item } from "react-stately";
import { Button } from "@wprdc/ui";

interface Props {
  onSubmit: (params: FilterFormValues) => void;
}

export function MapFilterForm({ onSubmit }: Props) {
  function handleSubmit(params: FilterFormValues) {
    // clear out null values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== null),
    );
    onSubmit(cleanParams);
  }

  return (
    <div className={styles.wrapper}>
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
              {Object.entries(schema).map(([slug, record]) => {
                return (
                  <div className={styles.field} key={slug}>
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
                          >
                            {record.items.map((item) => (
                              <Item key={item.id}>{item.label}</Item>
                            ))}
                          </Select>
                        );
                      }}
                    </Field>
                  </div>
                );
              })}

              <div className={styles.buttonSection}>
                <Button type="submit">Apply Filters</Button>
                <Button onPress={handleReset}>Reset</Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
