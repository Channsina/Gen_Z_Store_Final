import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/images/products");

function sanitizeFilename(name) {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  return `${Date.now()}-${base}${ext}`;
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export default function localImageUploadPlugin() {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        cb(null, UPLOAD_DIR);
      },
      filename: (_req, file, cb) => cb(null, sanitizeFilename(file.originalname)),
    }),
    limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
    fileFilter: (_req, file, cb) => {
      if (!ALLOWED_TYPES.has(file.mimetype)) {
        cb(new Error("Only JPG, PNG, WEBP, or GIF images are allowed."));
        return;
      }
      cb(null, true);
    },
  }).single("image");

  return {
    name: "local-image-upload",
    apply: "serve", // dev server only — never runs during `vite build`
    configureServer(server) {
      server.middlewares.use("/api/upload-product-image", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }
        upload(req, res, (err) => {
          if (err) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
          if (!req.file) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "No file uploaded." }));
            return;
          }
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ path: `/images/products/${req.file.filename}` }));
        });
      });
    },
  };
}
