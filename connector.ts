import { Connector, Media } from "@chili-publish/studio-connectors";

export default class MyConnector implements Media.MediaConnector {

  private runtime: Connector.ConnectorRuntimeContext;

  constructor(runtime: Connector.ConnectorRuntimeContext) {
    this.runtime = runtime;
  }

  async query(
    options: Connector.QueryOptions,
    context: Connector.Dictionary
  ): Promise<Media.MediaPage> {

    this.runtime.logError("QUERY");
    this.runtime.logError(JSON.stringify(options, null, 4));
    this.runtime.logError(JSON.stringify(context, null, 4));

    return {
      pageSize: options.pageSize, // Note: pageSize is not currently used by the UI

      data: [{

        id: "5",
        name: context["url"] as string,
        relativePath: "",
        type: 0,
        metaData: {}
      }],

      links: {
        nextPage: "" // Pagination is ignored in this example
      }
    }
  }

  async detail(
    id: string,
    context: Connector.Dictionary
  ): Promise<Media.MediaDetail> {
    return {
      name: id,
      id: id,
      metaData: {},
      relativePath: "/",
      type: 0
    }
  }

  async download(
    id: string,
    previewType: Media.DownloadType,
    intent: Media.DownloadIntent,
    context: Connector.Dictionary
  ): Promise<Connector.ArrayBufferPointer> {

    this.runtime.logError("DOWNLOAD");
    this.runtime.logError(JSON.stringify(context, null, 4));
    this.runtime.logError(JSON.stringify(previewType, null, 4));
    this.runtime.logError(JSON.stringify(intent, null, 4));

    // if (context["auth"] != "") {
    //   const picture = await this.runtime.fetch(context["url"] as string, { method: "GET", headers: { "Authorization": context["auth"] } });
    //   return picture.arrayBuffer;
    // }
    // else {
    //   const picture = await this.runtime.fetch(context["url"] as string, { method: "GET" });
    //   return picture.arrayBuffer;
    // }
    const picture = await this.runtime.fetch(context["url"] as string, { method: "GET" });
    return picture.arrayBuffer;

  }

  getConfigurationOptions(): Connector.ConnectorConfigValue[] | null {
    return [
      {
        name: "url",
        displayName: "Image URL",
        type: "text"
      }
    ];
  }

  getCapabilities(): Media.MediaConnectorCapabilities {
    return {
      query: true,
      detail: true,
      filtering: true,
      metadata: false,
    };
  }
}
