FROM angelat/gatsby:onbuild as build

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub
