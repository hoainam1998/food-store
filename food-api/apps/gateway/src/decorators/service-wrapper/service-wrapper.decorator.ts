export const ServiceWrapper: MethodDecorator = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args) {
    try {
      this.logger.log('Send message to category microservice');
      return originMethod.call(this, ...args);
    } catch (error) {
      this.logger.error(
        `Send message to category microservice failed with: ${error.message}`,
      );
      throw error;
    }
  };
  return descriptor;
};
