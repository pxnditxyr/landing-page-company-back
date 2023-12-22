import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  ( _data, ctx : ExecutionContext ) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    return user
  }
)
