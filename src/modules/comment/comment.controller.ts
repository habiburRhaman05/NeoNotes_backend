import { Controller } from "../../types/controller";
import { sendSuccess } from "../../utils/apiResponse";
import { AppError } from "../../utils/AppError";
import { commentServices } from "./comment.service";

// creating a new comment

const createNewComment: Controller = async (req, res) => {
    const { content, status, authorId, postId, parentId } = req.body;

    const newComment = await commentServices.createCommentService({
        content,
        status,
        authorId,
        postId,
        parentId,
    });

    return sendSuccess(res, {
        message: "Comment created successfully",
        data: newComment,
    });
};

// getting comment with replies and author data

// const getPostComments: Controller = async (req, res) => {
//   const { postId } = req.params;

//   // URL থেকে আসা ID স্ট্রিং থাকে, তাই Number-এ কনভার্ট করতে হবে
//   const comments = await commentServices.getPostCommentsService(Number(postId));

//   return sendSuccess(res, {
//     message: "Comments fetched successfully",
//     data: comments,
//   });
// };

// update comment

const updateComment: Controller = async (req, res) => {
    const { id } = req.params; // Comment ID
    console.log(req.body);
    
    const { content, status, authorId } = req.body; // authorId চেক করার জন্য পাঠানো হচ্ছে

    const updatedComment = await commentServices.updateCommentService(
        Number(id),
        authorId,
        { content, status }
    );

    return sendSuccess(res, {
        message: "Comment updated successfully",
        data: updatedComment,
    });
};

// delete comment 

const deleteComment: Controller = async (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body; // শুধুমাত্র কমেন্ট মালিক ডিলিট করতে পারবে
console.log(req.user);

    if(!authorId){
        throw new AppError("author id not provided")
    }

    await commentServices.deleteCommentService(Number(id), authorId);

    return sendSuccess(res, {
        message: "Comment deleted successfully",
    });
};

// export all controllers

export const commentControllers = {
    createNewComment,
    //   getPostComments,
    updateComment,
    deleteComment,
};