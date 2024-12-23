export const ResolverWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args): Promise<any> {
    this.logger.log('Calling category graphql service!');

    return originMethod.call(this, ...args);
  };
  return descriptor;
};
