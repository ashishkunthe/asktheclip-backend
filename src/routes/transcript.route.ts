import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { z } from "zod";
import Transcript from "../models/Transcript";

const route = Router();

interface RequestExtended extends Request {
  userId: string;
}

route.post(
  "/analyse",
  //   @ts-ignore
  authMiddleware,
  async (req: RequestExtended, res: Response) => {
    const inputSchema = z.object({
      videoUrl: z.string().url(),
    });

    const validate = inputSchema.safeParse(req.body);

    if (!validate.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validate.error,
      });
    }

    const { videoUrl } = validate.data;
    const userId = req.userId;

    try {
      const transcript = [
        {
          time: "00:01",
          text: "the video content syas xyz",
        },
      ];

      const videoTranscript = await Transcript.create({
        createdBy: userId,
        videoUrl: videoUrl,
        transcript: transcript,
      });

      res.json({
        message: "Transcript saved",
        transcriptId: videoTranscript._id,
      });
    } catch (error) {
      console.log("failed to save transcript", error);
      res.json({
        message: "something went wrong",
      });
    }
  }
);

export default route;
