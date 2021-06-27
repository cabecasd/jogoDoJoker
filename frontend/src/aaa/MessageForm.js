import React from "react";
import { Formik, Field } from "formik";

function MessageForm({onFocus, onBlur}) {
  return (
    <section>
      <Formik
        initialValues={{ name: "", message: "" }}
        onSubmit={async (values, {resetForm}) => {
          console.log(values);
          try {
            const res = await fetch("/api/messages", {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json"
              }
            })
            if (res.status === 201) {
              resetForm()
            }
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {
          (props) => (
            <form onSubmit={props.handleSubmit}>
              <p>
                <label htmlFor="name">
                  Nome:
                  <Field type="text" name="name" id="name" />
                </label>
              </p>
              <p>
                <label htmlFor="message">
                  Mensagem:
                  <Field as="textarea" name="message" id="message"
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </label>
              </p>

              <button type="submit">Submeter</button>
            </form>
          )
        }
      </Formik>
    </section>
  )
}

export default MessageForm;