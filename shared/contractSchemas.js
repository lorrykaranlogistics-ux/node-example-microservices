const fs = require("fs");
const path = require("path");

function loadSchema(relativePath) {
  const candidates = [
    path.join(__dirname, "..", "contracts", relativePath),
    path.join("/contracts", relativePath),
    path.join(process.cwd(), "contracts", relativePath),
  ];

  for (const fullPath of candidates) {
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    }
  }

  throw new Error(`Contract schema not found: ${relativePath}`);
}

const paymentAuthorizeRequestSchema = loadSchema(path.join("payment", "v1", "payment-authorize.request.schema.json"));
const paymentAuthorizeResponseSchema = loadSchema(path.join("payment", "v1", "payment-authorize.response.schema.json"));

function validateAgainstSchema(value, schema, path = "$") {
  const errors = [];

  if (schema.type === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      errors.push(`${path} must be an object`);
      return errors;
    }

    const required = schema.required || [];
    for (const key of required) {
      if (!(key in value)) {
        errors.push(`${path}.${key} is required`);
      }
    }

    const properties = schema.properties || {};
    for (const [key, val] of Object.entries(value)) {
      if (!(key in properties)) {
        if (schema.additionalProperties === false) {
          errors.push(`${path}.${key} is not allowed`);
        }
        continue;
      }
      errors.push(...validateAgainstSchema(val, properties[key], `${path}.${key}`));
    }
    return errors;
  }

  if (schema.type === "string") {
    if (typeof value !== "string") {
      errors.push(`${path} must be a string`);
      return errors;
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path} must have at least ${schema.minLength} characters`);
    }
    if (schema.enum && !schema.enum.includes(value)) {
      errors.push(`${path} must be one of [${schema.enum.join(", ")}]`);
    }
    if (schema.pattern && !(new RegExp(schema.pattern).test(value))) {
      errors.push(`${path} does not match pattern ${schema.pattern}`);
    }
    return errors;
  }

  if (schema.type === "number") {
    if (typeof value !== "number" || Number.isNaN(value)) {
      errors.push(`${path} must be a number`);
      return errors;
    }
    if (schema.exclusiveMinimum !== undefined && !(value > schema.exclusiveMinimum)) {
      errors.push(`${path} must be > ${schema.exclusiveMinimum}`);
    }
    return errors;
  }

  return errors;
}

module.exports = {
  paymentAuthorizeRequestSchema,
  paymentAuthorizeResponseSchema,
  validateAgainstSchema,
};
