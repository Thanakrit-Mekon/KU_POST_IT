import { Controller, Get } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./posts.entity";

@Controller("posts")
export class Postscontroller {
    constructor(private postsService: PostsService) {}
    @Get()
    async findAllPosts(): Promise<Posts[]> {
        return this.postsService.findAllPosts();
    }
}