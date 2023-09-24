import * as z from "zod"

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { deleteRecord, getRecord, updateRecord } from "@/lib/supabase-admin";

const routeContextSchema = z.object({
  params: z.object({
    contactId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { userId } = auth();
  if (!userId) { 
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.


    // Delete the post.
    await deleteRecord('contacts', params.contactId);

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}


// async function verifyCurrentUserHasAccessToPost(postId: string) {
//   const session = await getServerSession(authOptions)
//   const count = await db.post.count({
//     where: {
//       id: postId,
//       authorId: session?.user.id,
//     },
//   })

//   return count > 0
// }