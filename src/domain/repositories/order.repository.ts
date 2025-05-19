import { Order } from '../entities/order.entity';

export interface OrderRepository {
  /**
   * Crea una nueva orden en el repositorio.
   * @param order - La entidad de orden a crear.
   * @returns La orden creada.
   */
  create(order: Order): Promise<Order>;

  /**
   * Busca una orden por su ID.
   * @param id - El ID de la orden a buscar.
   * @returns La orden encontrada o `null` si no existe.
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Actualiza el estado de una orden.
   * @param id - El ID de la orden a actualizar.
   * @param status - El nuevo estado de la orden.
   * @returns La orden actualizada.
   */
  updateStatus(id: string, status: string): Promise<Order>;
}