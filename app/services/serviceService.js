import { mockServices } from '../utils/mockData.js';

let services = [...mockServices];

export const ServiceService = {
    async getAllServices() {
        return services;
    },

    async getPractitionerServices(practitionerId) {
        return services.filter(s => s.practitionerId === practitionerId);
    },

    async addService(serviceData) {
        const newService = {
            id: 's' + Date.now(),
            ...serviceData
        };
        services.push(newService);
        return newService;
    },

    async deleteService(serviceId) {
        services = services.filter(s => s.id !== serviceId);
    }
};
