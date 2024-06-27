import { Route, apiErrors } from "zac-api";

import z from "zod";

new Route({
  method: "post",
  path: "/exemplo",
  files: { folder: "test", type: "image/", max: 2 },
  params: {
    body: z.object({
      name: z.string(),
      isTrue: z.coerce.boolean().default(true),
      idade: z.coerce.number().max(5, apiErrors.LONG_NUMBER_ERROR),
      email: z.string().email(apiErrors.INVALID_TEXT_REGEX_ERROR),
      list: z.array(z.string().max(5)).or(
        //or in muilti-form = (files exist)
        z
          .string()
          .max(5)
          .transform((field) => [field])
      ),
    }),
  },

  execute(req, res) {
    const files = req.saveFiles();

    if (files.success) {
      console.log(files.ids);
    }

    res.status(200).json({ body: req.body });
  },
});
