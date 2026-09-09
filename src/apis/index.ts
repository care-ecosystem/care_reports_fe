import { HttpMethod, PaginatedResponse } from "@/apis/types";
import { request } from "@/apis/query";
import { Note, NoteCreate, NoteUpdate } from "@/types/note";

const BASE = "/api/care_reports";

export const apis = {
  notes: {
    list: (facilityId: string) =>
      request<PaginatedResponse<Note>>(`${BASE}/notes/`, HttpMethod.GET, {
        facility_id: facilityId,
      }),

    retrieve: (id: string) =>
      request<Note>(`${BASE}/notes/${id}/`, HttpMethod.GET),

    create: (data: NoteCreate) =>
      request<Note>(
        `${BASE}/notes/`,
        HttpMethod.POST,
        data as unknown as Record<string, unknown>,
      ),

    update: (id: string, data: NoteUpdate) =>
      request<Note>(
        `${BASE}/notes/${id}/`,
        HttpMethod.PATCH,
        data as unknown as Record<string, unknown>,
      ),
  },
};
