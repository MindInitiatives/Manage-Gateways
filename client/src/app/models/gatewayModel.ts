export interface IDevices {
        vendor: string,
        status: string,
        uid: string,
        date_created: Date
}

export interface IGateway {
    gateway_name?: string,
    IPV4_address?: string,
    peripheral_devices?:Array<IDevices>

}

export interface IAllGateways {
        serialNumber: string,
        _id: string,
        gateway_name: string,
        IPV4_address: string,
        peripheral_devices?:Array<IDevices>
}