"use client";
import ConvertKitForm from 'convertkit-react/bin/convertkit-react.esm'

const config = {
  formId: 4916513,
  template: "clare",
  emailPlaceholder: "Email address",
  submitText: "Subscribe",
  hideName: true,
  buttonBackground: "#04E1FB",
  buttonColor: "#010f34",
};
function Newsletter() {
  return (
    <div>
      <ConvertKitForm {...config} />
    </div>
  );
}

export default Newsletter;
