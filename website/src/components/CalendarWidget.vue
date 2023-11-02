<template>
	<div
		class="mx-8 mt-6 mb-10 px-8 py-4 rounded-lg bg-white border-4 border-gray-100 shadow-lg"
	>
		<FullCalendar ref="calendar" :options="calendarOptions" />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarStore } from '@/stores/calendar.store';

const calendarStore = useCalendarStore();

export default defineComponent({
	components: {
		FullCalendar,
	},

	data() {
		return {
			calendarOptions: {
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				initialView: 'timeGridWeek', // Changez pour 'dayGridMonth' pour un affichage mensuel
				headerToolbar: {
					left: 'prev,today,next',
					center: 'title',
					right: 'timeGridDay,timeGridWeek,dayGridMonth', // user can switch between the two
				},
				events: [],
				nowIndicator: 'true',
				slotDuration: '01:00:00',
				slotMinTime: '08:00:00',
				slotMaxTime: '22:00:00',
				expandRows: 'true',
				height: 'auto',
				allDaySlot: false,
				fixedWeekCount: false,
				locale: 'fr',
				firstDay: 1,
				slotEventOverlap: true,
				slotLabelFormat: {
					hour: 'numeric',
					minute: '2-digit',
					omitZeroMinute: true,
					meridiem: 'false',
				},
			},
		};
	},
	async mounted() {
		// Envoyer une requête GET vers l'API
		this.calendarOptions.events = await calendarStore.getPlanning();
	},
});
</script>
