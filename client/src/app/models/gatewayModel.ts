export interface IDevices {
        vendor?: string,
        status?: string
}

export interface IGateway {
    serialNumber?: string,
    gateway_name?: string,
    IPV4_address?: string,
    peripheral_devices?:Array<IDevices>;

}